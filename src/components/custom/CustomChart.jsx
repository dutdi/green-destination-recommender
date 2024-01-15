import React from 'react';
import './BarChart.css';
import { FaTrainSubway } from 'react-icons/fa6';
import { FaCar } from 'react-icons/fa';
import { BsAirplaneFill } from 'react-icons/bs';
import { formatDuration } from '../../helpers/Functions.js';

const CustomChart = ({ mode, index, sum }) => {
    return (
        <div className='bar-chart'>
            <div className='bar-item'>
                {mode.mode === 'Train 🚉' ? (
                    <FaTrainSubway color='#00008B' />
                ) : mode.mode === 'Driving 🚗' ? (
                    <FaCar color='#cc0000' />
                ) : (
                    <BsAirplaneFill color='#2196F3' />
                )}{' '}
                <div className='bar' style={{ width: `${(mode.co2 / sum) * 100}%`, backgroundColor: index === 0 && 'green' }}></div>
                <div className='co2-label' style={{ fontWeight: index === 0 && 'bold' }}>
                    {mode.co2} kg CO₂e
                </div>
                <div className='time-label'>{formatDuration(mode.duration)}</div>
            </div>
        </div>
    );
};

export default CustomChart;
