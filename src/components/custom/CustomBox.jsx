import React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';

const CustomBox = ({ color, icon, title, text }) => {
    return (
        <Card variant='solid' color={color} invertedColors>
            <CardContent orientation='horizontal'>
                {icon}
                <CardContent>
                    <Typography level='body-md'>{title}</Typography>
                    <Typography level='h2'>{text}</Typography>
                </CardContent>
            </CardContent>
            <CardActions>
                <Button variant='soft' size='sm'>
                    Add to Watchlist
                </Button>
                <Button variant='solid' size='sm'>
                    See breakdown
                </Button>
            </CardActions>
        </Card>
    );
};

export default CustomBox;
