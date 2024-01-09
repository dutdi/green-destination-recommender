import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

const About = () => {
    return (
        <Container maxWidth='lg'>
            <Box my={2}>
                <Paper elevation={0} style={{ padding: '20px' }}>
                    <Typography variant='h4' gutterBottom>
                        Green Destination Recommender
                    </Typography>
                    <Divider />
                    <Box my={2}>
                        <Typography paragraph>
                            This application is developed as part of my <b>(Tunar Mahmudov)</b> master's thesis "Evaluating User
                            Decision-Making in Responsible Tourism: A Green Destination Recommender" at the Technical University of Munich.
                        </Typography>
                    </Box>

                    <Box my={2}>
                        <Typography variant='h5'>Objective of the Study</Typography>
                        <Typography paragraph>
                            The Green Destination Recommender is developed with the objective to augment sustainable tourism practices. The
                            primary purpose of this application is to conduct a thorough assessment of user decision-making processes within
                            the context of sustainable tourism. This involves a systematic evaluation of the choices and considerations made
                            by users in relation to environmental, social, and economic sustainability within the tourism industry. The
                            application aims to contribute to a deeper understanding of how users interact with and impact the sustainable
                            tourism sector.
                        </Typography>
                    </Box>

                    <Box my={2}>
                        <Typography variant='h5'>Methodological Framework</Typography>
                        <Typography paragraph>
                            The methodology employed allows users to input their originating location, desired month of travel, and
                            optionally specific interests in destination cities, encompassing cultural, historical, and culinary aspects.
                            The algorithm then computes the most sustainable travel routes, incorporating a variety of transportation modes
                            such as trains, driving, and flights. This computation includes an analysis of carbon dioxide equivalent
                            emissions, journey duration, and additional city-specific information, including popularity indices and expected
                            congestion levels during the selected timeframe. The application is capable of sorting the recommended
                            destinations based on the minimum projected CO2e emissions, popularity, and seasonal demand. These destinations
                            are presented through an interactive interface, either in a card or map format, supplemented with indicators
                            such as "Green Recommended" or "Hotspot Alert" to guide and slightly nudge the users towards more sustainable
                            choices.
                        </Typography>
                    </Box>

                    <Box my={2}>
                        <Typography variant='h5'>Anticipated Outcomes</Typography>
                        <Typography paragraph>
                            The fundamental aim of the application is to comprehend and elucidate the decision-making processes of users
                            within the realm of sustainable tourism. This involves an in-depth exploration of how individuals make choices
                            and judgments in relation to practices that promote environmental, social, and economic sustainability in
                            tourism. The application seeks to gather insights into user behaviors, preferences, and attitudes, with a focus
                            on how these elements influence and shape the landscape of sustainable tourism. Through this, the application
                            intends to contribute significantly to the broader understanding of consumer dynamics and their impact on the
                            sustainability of the tourism industry.
                        </Typography>
                    </Box>

                    <Box my={2}>
                        <Typography variant='h5'>Limitations</Typography>
                        <Typography paragraph>
                            The application is limited by the availability of data, which is primarily sourced from third-party providers.
                            This includes the number of cities, connections, popularity, seasonality data, and etc. The application is also
                            limited by the scope of the study, which is focused on the decision-making processes of users within the context
                            of sustainable tourism. This means that the application does not take into account other factors that may
                            influence user behaviors, preferences, and attitudes. These include the political, economic, and cultural
                            contexts of the users, as well as the broader social and environmental implications of their decisions.
                        </Typography>
                    </Box>

                    <Box my={2}>
                        <Typography variant='h5'>Credits</Typography>
                        <Typography paragraph>
                            The application is deployed on Github Pages and is developed using the following technologies:
                            <ul>
                                <li>React</li>
                                <li>Material-UI</li>
                                <li>Leaflet</li>
                            </ul>
                            The images used in the application are sourced from the following websites:
                            <ul>
                                <li>
                                    <a href='https://www.pexels.com/'>Pexels</a>
                                </li>
                                <li>
                                    <a href='https://unsplash.com/'>Unsplash</a>
                                </li>
                            </ul>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default About;