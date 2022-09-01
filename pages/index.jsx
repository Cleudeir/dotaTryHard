import CardPlayer from '../component/CardPlayer';
import styles from './index.module.css';
import Header from '../component/Header';
import {useRouter} from 'next/router';

const React = require('react');


export async function getStaticProps() {
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/ranking`);
  const data = await resp.json();
  return {
    props: {data},
    revalidate: 24 * 60 * 60,
  };
}

export default function Home({data}) {
  const router = useRouter();
  console.log(router.query);
  console.log(data);
  return (
    <div className={styles.container} >
      <Header/>
      <>
        <h2 className={styles.title}>Top 50</h2>
        <div className={styles.containerList} >

          <div className={styles.list_cards} >
            {data.slice(0, 50).map((item, index)=>(<CardPlayer key={index} index={index+1}item={item}/> ))}
          </div>
        </div>
      </>
      {data.length>50 &&(
        <>
          <h2 className={styles.title}>Top 200</h2>
          <div className={styles.containerList} >
            <div className={styles.list_cards} >
              {data.slice(50, 200).map((item, index)=>(<CardPlayer key={index} index={index+1}item={item}/> ))}
            </div>
          </div>
        </>
      )}
      {data.length>200 &&(
        <>
          <h2 className={styles.title}>Top 400</h2>
          <div className={styles.containerList} >
            <div className={styles.list_cards} >
              {data.slice(200, 400).map((item, index)=>(<CardPlayer key={index} index={index+1}item={item}/> ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
