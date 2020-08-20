import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import { 
    TextField, 
    Paper,
    Container,
    Button,
    Typography,
    CircularProgress
} from '@material-ui/core';

// firebase
import {
    auth,
} from "../../libraries/firebase/firebase";

// import Paper from '@material-ui/core/Paper';
// import Container from '@material-ui/core/Container';
// import { Button } from "@material-ui/core";
// import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress";
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

class Login extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            email: "",
            password: "",
            // workshopsByCategory: null,
            // email: "",
            // password: "",
        }

        this.on_submit = this.on_submit.bind(this);

    }

    // onsubmit form
    on_submit() {

        const email = this.state.email;
        const password = this.state.password;

        // console.log(this);
        auth.signInWithEmailAndPassword(email, password)

            .then(res => {

                // console.log("user logged!");

                this.props.history.push('/home');

            })

            .catch(function (error) {

                // console.log(error.code);

                alert('Ups, the data is not correct! Try it again!');

            });
    }

    componentDidMount() {

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                // console.log("user logged");

                this.props.history.push('/home');

            }

            else {

                // console.log("user no logged");

                // this.props.history.push('/login/');
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
                                    display: "flex",
                                    flexDirection: "column",
                                }}

                                elevation={5}
                            >
                                <TextField
                                    id="standard-uncontrolled"
                                    label="Email"
                                    margin="normal"
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                    value={this.state.email}
                                />

                                <TextField
                                    id="standard-uncontrolled"
                                    label="password"
                                    type="password"
                                    // defaultValue="Correo electrónico"
                                    margin="normal"
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                    value={this.state.password}
                                />

                                <Button align="center" variant="contained" color="primary" onClick={this.on_submit}>
                                    Ingresar
                                </Button>

                            </Paper>

                        </Container>

                        :

                        <CircularProgress />

                }

            </Container>
        );

    }

}

export default Login;