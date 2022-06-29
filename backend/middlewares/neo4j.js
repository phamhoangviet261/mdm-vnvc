const neo4j = require('neo4j-driver')
require('dotenv').config()

const demo = () => async() => {
    console.log('START CONNECT NEO4J........');
    const uri = process.env.NEO4J_URI;
    const user = process.env.NEO4J_USERNAME;
    const password = process.env.NEO4J_PASSWORD;
    
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    // const session = driver.session()
   
    try {
      await driver.verifyConnectivity()
      console.log('Driver created')
    } catch (error) {
      console.log(`connectivity verification failed. ${error}`)
    }
    
    const session = driver.session()
    try {
      await session.run('MATCH (n) RETURN (n);');
    } catch (error) {
      console.log(`unable to execute query. ${error}`)
    } finally {
      await session.close()
    }
   
    // Don't forget to close the driver connection when you're finished with it
    await driver.close()
    console.log('END CONNECT NEO4J........');
};


module.exports = {
    connectNeo4j: () => demo()
}