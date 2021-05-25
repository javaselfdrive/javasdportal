import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { CheckCircle, Cancel, Error } from '@material-ui/icons';
//import { CheckCircleIcon, CancelIcon, ErrorIcon } from '@material-ui/icons/Cancel';

const theme = createMuiTheme({
    overrides: {
        MuiSnackbarContent: {
            root: { 
                border: 'none', 
                backgroundColor: 'rgb(255, 255, 255)',
                fontFamily: 'cerapro',
                color: '#252B33',
                borderRadius: '1px'
            }
        },
        MuiAlert: {
            root: {
                border: 'none',
                backgroundColor: 'rgb(255, 255, 255)',
                fontFamily: 'cerapro',
                color: '#252B33',
                borderRadius: '5px',
                width: '300px',
                textAlign: 'left',
                boxShadow: '0px 7px 25px #0000000F'
            },
            standardSuccess: {
                backgroundColor: 'rgb(255, 255, 255)'
            },
            icon: {
                fontSize: '30px'
                // marginTop: '6px'
            },
            message: {
                padding: '10px 0px',
                fontFamily: 'ceraPro',
                fontSize: '13px'
            }
        }
    }
});

export default class CustomSnackbar extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            snackbaropen: false,
            title: '',
            response: '',
            messagetxt: ''
        };
    }

    snackbarClose = event => {
        this.setState({ snackbaropen: false });
    };

    render() {
        const { showSnack, response, title, messagetxt, hideAlert, hideSnack } = this.props;
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={showSnack}
                        autoHideDuration={4000}
                        onClose={hideSnack}
                    >
                        <Alert
                            onClose={hideAlert}
                            icon={
                                response === 'failed' ? (
                                    <Cancel color='secondary' style={messagetxt !== '' ? { marginTop: '5px', height: '28px' } : { marginTop: '0px', height: '20px' }} />
                                ) : response === 'warning' ? (
                                    <Error style={messagetxt !== '' ? { marginTop: '6px', height: '26px', color:'#FFA500' } : {  color:'#FFA500',marginTop: '0px', height: '20px' }} />
                                ) : (
                                    <CheckCircle color='green' style={messagetxt !== '' ? { marginTop: '5px', height: '28px' } : { marginTop: '0px', height: '20px' }} />
                                )
                            }
                            style={{
                                fontFamily: 'ceraPro',
                                width: '350px',
                                fontSize: '13px'
                            }}>
                            <AlertTitle
                                style={{
                                    color: '#252B33',
                                    fontWeight: 'bold',
                                    fontFamily: 'ceraPro',
                                    fontSize: '14px'
                                }}>
                                {' '}
                                {title}{' '}
                            </AlertTitle>
                            {messagetxt}
                        </Alert>
                    </Snackbar>
                </MuiThemeProvider>
            </div>
        );
    }
}