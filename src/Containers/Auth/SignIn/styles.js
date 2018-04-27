import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  scrollView: {
    paddingTop: 20
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 275,
    height: '100%',
    maxHeight: 200
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  formSummary: {
    width: '100%',
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 20
  },
  input: {
    width: '100%',
    maxWidth: 600,
    fontSize: 16
  },
  forgotPassword: {
    width: '100%',
    maxWidth: 600,
    textAlign: 'right',
    paddingLeft: 20,
    paddingRight: 20
  },
  submitButton: {
    width: '100%',
    maxWidth: 500,
    marginTop: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#1b7ff9',
    borderRadius: 5
  },
  disabledButton: {
    backgroundColor: '#CCC'
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 600,
    padding: 15,
    marginBottom: 80
  },
  footerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  footerText: {
    fontSize: 13
  },
  footerSmallText: {
    fontSize: 12
  },
  link: {
    color: '#1b7ff9'
  },
  absoluteCenter: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default styles;