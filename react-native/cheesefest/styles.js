const React = require('react-native')
const {StyleSheet} = React

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  liContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1
  },
  liTextContainer: {
      flex: 1,
      flexDirection: 'column', 
      alignSelf: 'center'
  },
  liText: {
    color: '#333',
    fontSize: 16,
    paddingLeft: 10,    
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#ffea00',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: 'bold'
  },
  detailText: {
    fontSize: 16,
    padding:10
  }
  
})

module.exports = styles
