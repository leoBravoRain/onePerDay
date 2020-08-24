import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
// import Container from '@material-ui/core/Container';
// import { Button } from "@material-ui/core";
// import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress";

// material ui
import {
    // TextField,
    Paper,
    Container,
    Button,
    Typography,
    CircularProgress,
    Select,
    MenuItem,
    InputLabel,
} from '@material-ui/core';

// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// import LiveTv from '@material-ui/icons/LiveTv';

// //  component
// import WorkshopComponent from "./components/workshop.component";
// import OverviewWorkshop from "./components/overviewWorkshop.component";

// firebase
// import { auth } from "../../config/firebase";
import {
    // st,
    fs,
    auth,
} from "../../libraries/firebase/firebase";

// import firebase from "firebase";

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


class Prizes extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            // loading: false,
            // image: null,
            daysPickingUpGarbage: -1,

            // // language to share image
            // imageTextLanguage: 0,

            // // garbage type
            // garbageType: 0,

            // workshopsByCategory: null,
            // email: "",
            // password: "",
        }

        // this.uploadGarbage = this.uploadGarbage.bind(this);

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

                // check number of garbages

                // get number of garbage
                fs.collection('oneGarbagePerDay').doc(user.uid).collection("oneGarbagePerDay").
                    get().then(snapshotQuery => {

                        // console.log(snapshotQuery.size);

                        this.setState({
                            daysPickingUpGarbage: snapshotQuery.size,
                        });

                    });

                this.setState({
                    userId: user.uid,
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

                <Container>

                    <Typography variant="body2" component="p" style={{ textAlign: "center", }}>

                        This prize is because you picked up your first garbage

                    </Typography>

                    {/* first garbage prize */}
                    {

                        this.state.daysPickingUpGarbage > 0 
                        
                        ? 

                            <a href="https://firebasestorage.googleapis.com/v0/b/oneperday-1758a.appspot.com/o/website%2FTime%20to%20celebrate!.png?alt=media&token=8a4686ae-2198-4c2f-8079-576459317407" download>

                                <img
                                    width = {200}
                                    height = {200}
                                    src= "https://firebasestorage.googleapis.com/v0/b/oneperday-1758a.appspot.com/o/website%2FTime%20to%20celebrate!.png?alt=media&token=8a4686ae-2198-4c2f-8079-576459317407"
                                />
                            </a>
                        :

                            <Typography variant="body2" component="p" style={{ textAlign: "center", }}>

                                In order to get this prize, please pickup your first garbage :)

                            </Typography>
                    }

                </Container>

            </Container>
        );

    }

}

export default Prizes;