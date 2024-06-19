import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  conatainer: {
    height: 190,
    width: 190,
    // backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    padding: 10,
    flexDirection: 'column',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: 100,
  },
  headText: {
    color: '#9691AD',
    fontSize: 17,
    fontWeight: '700',
  },
  time: {
    color: 'white',
    fontSize: 40,
  },
  bottom: {
    color: 'white',
    fontSize: 17,
  },
  graph: {
    backgroundColor: 'red',
    height: 70,
  },
});
export default style;
