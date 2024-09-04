import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { VERISOUL_ENV, VERISOUL_PROJECT_ID } from "@env";
import { authenticateSession } from './api'; // Assume this is your API file

export default function App() {
  const [receivedMessage, setReceivedMessage] = useState('No message received yet');
  const [apiResponse, setApiResponse] = useState('No API response yet');
  const [webviewMounted, setWebviewMounted] = useState(true);

  const webviewUrl = `https://js.verisoul.ai/${VERISOUL_ENV}/webview.html?project_id=${VERISOUL_PROJECT_ID}`;

  const handleMessage = async (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.session_id) {
        setReceivedMessage(`Received session ID: ${data.session_id}`);
        setWebviewMounted(false); // remove webview after session_id is received
        try {
          const response = await authenticateSession(data.session_id, 'some-unique-account-identifier');
          setApiResponse(JSON.stringify(response, null, 2));
        } catch (error) {
          setApiResponse(`API Error: ${error.message}`);
        }
      } else if (data.error) {
        setReceivedMessage(`Received error: ${data.error}`);
      } else {
        setReceivedMessage(`Received unknown message: ${event.nativeEvent.data}`);
      }
    } catch (error) {
      setReceivedMessage(`Failed to parse message: ${event.nativeEvent.data}`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('./assets/verisoul-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>react-native-sample-app</Text>
        {webviewMounted && (
          <WebView
            source={{ uri: webviewUrl }}
            style={styles.webview}
            onMessage={handleMessage}
          />
        )}
        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>Message from WebView:</Text>
          <Text style={styles.message}>{receivedMessage}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>API Response:</Text>
          <Text style={styles.message}>{apiResponse}</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  webview: { // make webview hidden
    width: 0,
    height: 0,
    opacity: 0,
    position: 'absolute',
  },
  messageContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  message: {
    fontSize: 16,
    color: '#666',
  },
});