import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { formatNumber } from '../../helpers/Functions.js';

const CityHeader = ({ toDestination }) => {
    return (
        toDestination && (
            <Box
                sx={{
                    width: '100%',
                    position: 'relative',
                    overflow: { xs: 'auto', sm: 'initial' },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        display: 'block',
                        width: '1px',
                        left: '500px',
                        top: '-24px',
                        bottom: '-24px',
                        '&::before': {
                            top: '4px',
                            display: 'block',
                            position: 'absolute',
                            right: '0.5rem',
                            color: 'text.tertiary',
                            fontSize: 'sm',
                            fontWeight: 'lg',
                        },
                        '&::after': {
                            top: '4px',
                            display: 'block',
                            position: 'absolute',
                            left: '0.5rem',
                            color: 'text.tertiary',
                            fontSize: 'sm',
                            fontWeight: 'lg',
                        },
                    }}
                />
                <Card
                    orientation='horizontal'
                    sx={{
                        width: '100%',
                        flexWrap: 'wrap',
                        [`& > *`]: {
                            '--stack-point': '500px',
                            minWidth:
                                'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
                        },
                        overflow: 'auto',
                        resize: 'horizontal',
                    }}
                >
                    <AspectRatio flex ratio='1' maxHeight={182} sx={{ minWidth: 182 }}>
                        <img src={require(`../../media/misc/${toDestination.id}.jpg`)} loading='lazy' alt='' />
                    </AspectRatio>
                    <CardContent>
                        <Typography fontSize='xl' fontWeight='lg'>
                            {toDestination.name}, {toDestination.country} {toDestination.flag}
                        </Typography>
                        <Typography level='body-sm' fontWeight='lg' textColor='text.tertiary'>
                            {toDestination.description}
                        </Typography>
                        <Sheet
                            sx={{
                                bgcolor: 'background.level1',
                                borderRadius: 'sm',
                                p: 1.5,
                                my: 1.5,
                                display: 'flex',
                                gap: 2,
                                '& > div': { flex: 1 },
                            }}
                        >
                            <div>
                                <Typography level='body-xs' fontWeight='lg'>
                                    Sustainability Score
                                </Typography>
                                <Typography fontWeight='lg'>84/100</Typography>
                            </div>
                            <div>
                                <Typography level='body-xs' fontWeight='lg'>
                                    Air Quality Index
                                </Typography>
                                <Typography fontWeight='lg'>{toDestination.aqi.aqi_val} / 5</Typography>
                            </div>
                            <div>
                                <Typography level='body-xs' fontWeight='lg'>
                                    Population
                                </Typography>
                                <Typography fontWeight='lg'>{formatNumber(toDestination.population)}</Typography>
                            </div>
                        </Sheet>
                        <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                            <Button variant='outlined' color='neutral'>
                                Back
                            </Button>
                            <Button variant='solid' color='primary'>
                                Choose
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        )
    );
};

export default CityHeader;
