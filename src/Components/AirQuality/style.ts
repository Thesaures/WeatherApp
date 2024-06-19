import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    height: 160,
    width: 380,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    flexDirection: 'column',
    borderRadius: 40,
    padding: 10,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -210,
  },
  headText: {
    color: '#9691AD',
    fontSize: 17,
    fontWeight: '700',
  },
  nextText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    margin: 10,
    marginLeft: -120,
  },
  lastText: {
    color: 'white',
    fontSize: 17,
    // fontWeight: '500',
    margin: 5,
  },
  last: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    marginTop: 20,
  },
  graph: {
    height: 5,
    width: 325,
    borderRadius: 80,
    position: 'relative',
  },
});
export default style;
//3659B1
//D84CB8
