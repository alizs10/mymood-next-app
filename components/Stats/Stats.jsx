import { Chart as ChartJS, ArcElement, Tooltip, Legend, defaults } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
defaults.font.family = 'iransans';

ChartJS.register(ArcElement, Tooltip, Legend);
const Stats = (props) => {

    const data = {
        labels: ['غمگین', 'شاد', 'مریض', 'خسته', 'عصبانی', 'مضطرب', 'بی حس', 'متعجب'],
        datasets: [
            {
                label: '# of Votes',
                data: props.data,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    return (

        <section className="flex flex-col flex-y-4 w-full">
            <h1 classNameName='text-sm lg:text-base text-slate-800'>آمار کاربران مای مود بر اساس مودهایی که داشته اند</h1>

            <div className="flex-center w-1/2 lg:w-3/5 self-center">
                <Doughnut data={data} />
            </div>

        </section>
    );
}

export default Stats;