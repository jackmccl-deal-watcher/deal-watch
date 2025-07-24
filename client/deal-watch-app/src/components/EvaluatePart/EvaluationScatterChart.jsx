import './EvaluatePart.css'
import { cheerfulFiestaPalette, ScatterChart } from '@mui/x-charts';
import { useScatterSeries, useXScale, useYScale } from '@mui/x-charts/hooks';
import { convertPriceToDollar } from '../../utils/Currency';

// LinkPoints function from MUIX example
function LinkPoints({ seriesId, close }) {
    const scatter = useScatterSeries(seriesId);
    const xScale = useXScale();
    const yScale = useYScale();

    if (!scatter) {
        return null;
    }
    const { color, data } = scatter;

    if (!data) {
        return null;
    }

    return (
        <path
            fill="none"
            stroke={color}
            strokeWidth={10}
            d={`M ${data.map(({ x, y }) => `${xScale(x)}, ${yScale(y)}`).join(' L')}${
            close ? 'Z' : ''
            }`}
        />
        );
}

const EvaluationScatterChart = ({ evaluationData }) => {
    const WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000
    const MONTH_IN_MILLSECONDS = 30 * 24 * 60 * 60 * 1000

    const fixPointDates = () => {
        const allPoints = [...evaluationData.X_Y_Points, evaluationData.M_A_Points]
        const fixedPoints = allPoints.map((X_Y_Point) => {
            const data = X_Y_Point.data.map( (X_Y_Point_data) => {
                return {
                    x: new Date(X_Y_Point_data.x), 
                    y: X_Y_Point_data.y, 
                }
            })
            X_Y_Point.data = data
            X_Y_Point.valueFormatter = (data) => {
                return `(${convertDateToMonthDayYear(data.x)}, ${convertPriceToDollar(data.y)})`
            }
            return X_Y_Point
        })
        return fixedPoints
    }

    const convertDateToMonthDay = (date) => {
        date = new Date(date)
        return `${date.getMonth()+1}/${date.getDate()}`
    }

    const convertDateToMonthDayYear = (date) => {
        date = new Date(date)
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
    }

    return (
        <ScatterChart
            height={1000}
            yAxis={[{
                valueFormatter: convertPriceToDollar,
                width: 60,
            }]}
            xAxis={[{
                scaleType: 'time',
                valueFormatter: convertDateToMonthDay,
                tickInterval: WEEK_IN_MILLISECONDS,
                tickLabelInterval: MONTH_IN_MILLSECONDS,
                domainLimit: 'strict',
            }]}
            series={fixPointDates()}
            grid={{ vertical: true, horizontal: true }}
            colors={ cheerfulFiestaPalette }
        >
            <LinkPoints seriesId="7-day-moving-average" />
        </ScatterChart>
    )
}

export default EvaluationScatterChart