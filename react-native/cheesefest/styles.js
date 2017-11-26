const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
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
    fontWeight: "bold"
  },
  statusbar: {
    backgroundColor: '#ffea00',
    height: 22,
  },
  
})

module.exports = styles
module.exports.constants = constants;