import MainLayout from './../layouts/MainLayout';
import WithSidebar from './../layouts/WithSidebar';
import SEOHeader from '../components/SEOHeader';
import Metgate from '../images/metgate.png';
import Metshop from '../images/MetShop.jpg';
import Metpic2 from '../images/metpic2.jpg';

function MTC() {

    return (
        <MainLayout>
            <WithSidebar>
            <SEOHeader title="MTC - Ajaokuta Steel Company Limited" />
                <h2>Brief On Metallurgical Training Centre MTC</h2>
                <br></br>
                <h4>1. INTRODUCTION</h4>
                
                <img src={Metgate}/>

                <p> The metallurgical training centre MTC of Ajaokuta steel company limited (ASCL) was 
                    established in November 1978 was patterned in an organizational structure after Kharkov 
                    polytechnics of the former soviet union(USSR) and the centre was moved to its 
                    present permanent site in 1990.</p>
                <p>It was established with the sole aim of providing skilled manpower for the steel and 
                    allied industries.it was also designed to be able to make some of the industrial spare parts 
                    and equipment in the course of practical works of the trainees.</p>   
                <h4>2.	TRAINING CAPABILITY</h4> 
                <img src={Metshop}/>
                <p> MTC is capable of designing, developing and organizing training for immediate and future needs 
                    of Steel, Oil& Gas and other allied industries. The centre is committed to producing qualified 
                    and competent operatives,supervisors,technologist and engineers who will be to face the challenges 
                    of the industries.</p>
                <p>MTC has been carrying out series of training programmes for the entire manpower in ASCL and also the 
                    external candidates.</p> 
                <p>The centre training outfits consists of two schools namely: Craftsman Training school which was 
                    designed capacity for 1,980 trainees on 31 courses per year and technician training school which has 
                    designed capacity for 1,560 trainees on 13 courses in two years.Thus,MTC has capacity for 3,540 
                    candidates on long term training programs simultaneously.</p>   
                <h4>3.	GENERAL OBJECTIVES OF MTC</h4>    
                <img src={Metpic2}/> 
                    <li>Provides training in steel technology for various levels of manpower within the industry 
                       and other allied industries to meet job requirements;</li>
                    <li>Reduces reliance on overseas training thereby saving scarce foreign exchange earnings;</li>
                    <li>Fosters self-reliance within steel industry in the area of training and development 
                        thereby helping the economy of our dear nation to grow;</li>
                    <li>Provides an intellectual and practical centre for cross-fertilization of ideas;</li>    
                    <li>Provides opportunities for Nigerian youths at large to be trained so that they can:</li>
                   <p> -	Be employable
                    -	Be Self-dependent
                    -	Bridge the technological gap between Nigeria and the global world</p>

            </WithSidebar>
        </MainLayout>
    )
}

export default MTC;