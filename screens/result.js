import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { db } from "../firebasestore";
import { collection, getDocs } from "firebase/firestore";
import { Authcontext } from "../contextstore";

function Result() {
    const authctx = useContext(Authcontext);
    const userid = authctx.studentid;
    const [allresult, setAllResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [totalObtainedMarks, setTotalObtainedMarks] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);
    const [totalPercentage, setTotalPercentage] = useState(0);
    const [totalGrade, setTotalGrade] = useState("");

    useEffect(() => {
        ReadResult();
    }, []);

    async function ReadResult() {
        try {
            const resultsnapshot = await getDocs(collection(db, 'studentResults'));
            const resultlist = resultsnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const filteredResults = resultlist.filter(result => result.studentId === userid);
            setAllResult(filteredResults);
            if (filteredResults.length > 0) {
                const currentMonth = filteredResults[0].month;
                setSelectedMonth(currentMonth);
                calculateTotal(filteredResults.filter(result => result.month === currentMonth));
            }
        } catch (error) {
            console.error("Error fetching results: ", error);
        } finally {
            setLoading(false);
        }
    }

    const calculateTotal = (results) => {
        const obtainedMarksArray = results.map(result => {
            const marks = Number(result.obtainedMarks);
            if (isNaN(marks)) {
                console.warn("Invalid obtainedMarks value: ", result.obtainedMarks);
                return 0;
            }
            return marks;
        });
        const totalMarksArray = results.map(result => {
            const marks = Number(result.totalMarks);
            if (isNaN(marks)) {
                console.warn("Invalid totalMarks value: ", result.totalMarks);
                return 0;
            }
            return marks;
        });

        const totalObtained = obtainedMarksArray.reduce((acc, mark) => acc + mark, 0);
        const totalMarks = totalMarksArray.reduce((acc, mark) => acc + mark, 0);

        const percentage = ((totalObtained / totalMarks) * 100).toFixed(2);
        setTotalMarks(totalMarks);
        setTotalObtainedMarks(totalObtained);
        setTotalPercentage(percentage);
        setTotalGrade(getGrade(percentage));
    };

    const getGrade = (percentage) => {
        if (percentage >= 90) return "A+";
        if (percentage >= 80) return "A";
        if (percentage >= 70) return "B";
        if (percentage >= 60) return "C";
        if (percentage >= 50) return "D";
        return "F";
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    const months = [...new Set(allresult.map(data => data.month))];
    const filteredResults = allresult.filter(result => result.month === selectedMonth);

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Your Results</Text>
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthScroll}>
                    {months.map((month) => (
                        <TouchableOpacity key={month} onPress={() => {
                            setSelectedMonth(month);
                            calculateTotal(allresult.filter(result => result.month === month));
                        }}>
                            <View style={[
                                styles.monthBox,
                                selectedMonth === month ? styles.selectedMonthBox : null,
                            ]}>
                                <Text style={styles.monthText}>{month}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {filteredResults.length === 0 ? (
                <View style={styles.noResultContainer}>
                    <Ionicons name="sad-outline" size={50} color="#BB86FC" />
                    <Text style={styles.noResultText}>No results found</Text>
                </View>
            ) : (
                <ScrollView>
                    {filteredResults.map((data) => (
                        <View key={data.id} style={styles.resultBox}>
                            <View style={styles.resultContent}>
                                <View style={styles.resultRow}>
                                    <Ionicons name="book-outline" size={18} color="#1DB954" />
                                    <Text style={styles.resultSubject}>{data.subject}</Text>
                                </View>
                                <View style={styles.resultRow}>
                                    <Ionicons name="medal-outline" size={18} color="#E0E0E0" />
                                    <Text style={styles.resultMarks}>
                                        Marks: {data.obtainedMarks} / {data.totalMarks}
                                    </Text>
                                </View>
                                <View style={styles.resultRow}>
                                    <Ionicons name="analytics-outline" size={18} color="#1DB954" />
                                    <Text style={styles.resultMarks}>Percentage: {((data.obtainedMarks / data.totalMarks) * 100).toFixed(2)}%</Text>
                                </View>
                                <View style={styles.resultRow}>
                                    <Ionicons name="trophy-outline" size={18} color="#E0E0E0" />
                                    <Text style={styles.resultMarks}>Grade: {getGrade((data.obtainedMarks / data.totalMarks) * 100)}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

export default Result;

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
        textAlign: 'center',
        marginTop: 16,
    },
    monthScroll: {
        marginBottom: 16,
    },
    monthBox: {
        backgroundColor: "#1C1C1C",
        borderRadius: 16,
        padding: 10,
        marginRight: 8,
    },
    selectedMonthBox: {
        backgroundColor: "#1DB954",
    },
    monthText: {
        color: "#E0E0E0",
    },
    noResultContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noResultText: {
        marginTop: 10,
        fontSize: 18,
        color: "#A0A0A0",
    },
    resultBox: {
        backgroundColor: "#1C1C1C",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 4,
    },
    resultContent: {
        borderTopWidth: 1,
        borderTopColor: "#2C2C2C",
        paddingTop: 8,
    },
    resultRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    resultSubject: {
        marginLeft: 8,
        fontSize: 16,
        color: "#E0E0E0",
    },
    resultMarks: {
        marginLeft: 8,
        fontSize: 16,
        color: "#BB86FC",
    },
    summaryBox: {
        backgroundColor: "#2A2A2A",
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1DB954",
        marginBottom: 8,
        textAlign: 'center',
    },
    summaryRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    summaryText: {
        marginLeft: 8,
        fontSize: 16,
        color: "#E0E0E0",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212", // Dark background
    },
    loadingText: {
        fontSize: 20,
        color: "#1DB954", // Make sure the text is visible against the dark background
    },
});
