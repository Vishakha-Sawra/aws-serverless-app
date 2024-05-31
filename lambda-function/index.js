const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  try {
    console.log('Raw input data:', event); 

    const formData = {
      name: event.name,
      email: event.email,
      subject: event.subject,
      message: event.message,
    };

    const item = {
      SubmissionId: generateUUID(), 
      ...formData,
    };

    await storeFormData(item);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form submitted successfully' }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error submitting the form' }),
      };
    }
  };
  
  async function storeFormData(item) {
    const params = {
      TableName: 'ContactFormEnteries',
      Item: item,
    };
  
    await dynamodb.put(params).promise();
  }
  
  function generateUUID() {
    return uuidv4();
  }