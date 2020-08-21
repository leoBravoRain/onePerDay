import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Button, Box } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// import LiveTv from '@material-ui/icons/LiveTv';

import {
    fs,
    auth,
} from "../../libraries/firebase/firebase";

// //  component
// import WorkshopComponent from "./components/workshop.component";
// import OverviewWorkshop from "./components/overviewWorkshop.component";

// firebase
// import { auth } from "../../config/firebase";
// import { fs } from "../../config/firebase";

// // workshop mockup
// const _workshops = [
//     {
//         "title": "Yoga indio",
//         "teacher": "Daniela Parra",
//         "description": "Unete a nuestras clases de yoga, para hacer ejercicios y sacarte el estrés que tienes dentro",
//         "image": "https://images.yogaanytime.com/2017/12/13/large_sarah_170825_YA13140_content-19948.jpg?width=768",
//         "teacherMobileNumber": "+56937827142",
//         "category": "Deportes",
//         "schedule": [
//             "Lunes 8:00 a 9:30",
//             "Miercoles 8:00 a 9:30",
//         ]
//     },

//     {
//         "title": "Baile entretenido",
//         "teacher": "Rodrigo Días",
//         "description": "Unete a nuestras clases unicas de baile entretenido",
//         "image": "https://statics-cuidateplus.marca.com/sites/default/files/images/zumba.jpg",
//         "teacherMobileNumber": "+56937827142",
//         "category": "Deportes",
//         "schedule": [
//             "Lunes 8:00 a 9:30",
//             "Miercoles 8:00 a 9:30",
//         ]
//     },

//     {
//         "title": "Clases de guitarra",
//         "teacher": "Rodrigo Valencia",
//         "description": "Unete a nuestras clases unicas de guitarra",
//         "image": "https://img.fotocommunity.com/guitar-man-ff55a084-e878-4372-a9a0-ee771a3a0fdc.jpg?height=1080",
//         "teacherMobileNumber": "+56937827142",
//         "category": "Musica",
//         "schedule": [
//             "Lunes 8:00 a 9:30",
//             "Miercoles 8:00 a 9:30",
//         ]
//     }

// ];

class Home extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: true,
            workshopsByCategory: null,
            garbagesPerDay: [],
            // email: "",
            // password: "",
        }

    }

    componentDidMount() {

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (!user) {

                // console.log("user not logged");

                this.props.history.push('/login');

                // console.log("aosjid");

            }

            else {

                // console.log("user logged");
                // alert("user logged");

                // this.props.history.push('/login/');

                this.setState({
                    userId: user.uid,
                });

                // get number of garbage
                fs.collection('oneGarbagePerDay').doc(this.state.userId).collection("oneGarbagePerDay").
                    get().then(snapshotquery => {

                        // // get data from API
                        var garbages = [];

                        // iterate over each item
                        snapshotquery.forEach(doc => {

                            // console.log(doc.data());
                            let garbage = doc.data();
                            // store location
                            // loteo["location"] = [loteo.location.latitude, loteo.location.longitude];
                            // garbage["id"] = doc.id;
                            // add loteo to list
                            garbages.push(garbage);

                        });

                        // update state
                        this.setState({

                            // flag of getting data from API
                            get_garbages: true,
                            // update garbages
                            garbagesPerDay: garbages,

                            loading: false,

                        },
                        
                            // () => {
                            //     console.log(this.state.garbages)
                            // }
                        );

                    });


            }

        });

    }

    render() {

        // return method
        return (

            <Container
                style={{
                    // margin: 20,
                    // padding: 20,
                    // backgroundColor: "red",
                }}
            >

                {
                    !this.state.loading

                        ?

                        <Container>

                            {/* title */}
                            <Paper
                                style={{
                                    margin: 15,
                                    padding: 5,
                                }}

                                elevation={5}
                            >
                                <Typography variant="h6" component="h6" style={{ textAlign: "center", }}>

                                   Your collection of garbage

                                </Typography>

                                {/* add new garbage */}
                                <Button variant="contained" color="primary"
                                    onClick={() => this.props.history.push("/addNewGarbage")}
                                >
                                    Add new one
                                </Button>


                                {/* collection of iamges */}

                                {
                                    this.state.garbagesPerDay.map((item) => {

                                        return (
                                            <Box>

                                                <Typography variant = "body2">
                                                    {item.date.toDate().toString()}

                                                </Typography>
                                               <img
                                                    width = {200}
                                                    height = {200}
                                                    src = {item.image}
                                               />

                                            </Box>
                                        )
                                    })
                                }

                            </Paper>

                            

                        </Container>

                        :

                        <CircularProgress />

                }

            </Container>
        );

    }

}

export default Home;