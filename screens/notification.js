import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { db } from "../firebasestore"; 
import { getDocs, collection } from "firebase/firestore";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const fetchNotifications = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Notification"));
            const notificationsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotifications(notificationsData);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch notifications");
            console.error("Error fetching notifications: ", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Notifications</Text>
            <ScrollView>
                {notifications.length > 0 ? (
                    notifications.map((item) => (
                        <View key={item.id} style={styles.notificationContainer}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="notifications-outline" size={24} color="#1DB954" />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.tital || "No Title"}</Text>
                                <Text style={styles.description}>{item.description || "No Description"}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noNotificationText}>No notifications available</Text>
                )}
            </ScrollView>
        </View>
    );
}

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1DB954",
        marginBottom: 16,
        marginTop: 24,
        marginTop:38
    },
    notificationContainer: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#1C1C1C",
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    iconContainer: {
        justifyContent: "center",
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#E0E0E0",
    },
    description: {
        fontSize: 14,
        color: "#A0A0A0",
        marginTop: 4,
    },
    noNotificationText: {
        color: "#E0E0E0",
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
    },
});