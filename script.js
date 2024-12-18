$(document).ready(function () {
    const scheduleUrl = "YOUR_JSON_URL"; // Replace with the hosted JSON file URL.

    $("#submitDay").click(function () {
        const day = $("#dayInput").val().toUpperCase();
        if (!["A", "B", "C", "D", "E", "F", "G"].includes(day)) {
            alert("Please enter a valid day (A-G).");
            return;
        }

        $.ajax({
            url: scheduleUrl,
            method: "GET",
            dataType: "json",
            success: function (data) {
                const filteredClasses = data.schedule.filter(classInfo =>
                    classInfo.days.includes(day)
                );

                const scheduleList = $("#scheduleList");
                scheduleList.empty();

                if (filteredClasses.length === 0) {
                    scheduleList.append("<tr><td colspan='5'>No classes today</td></tr>");
                } else {
                    filteredClasses.forEach(classInfo => {
                        scheduleList.append(`
                            <tr>
                                <td>${classInfo.period}</td>
                                <td>${getTimeForPeriod(classInfo.period)}</td>
                                <td>${classInfo.class}</td>
                                <td>${classInfo.teacher}</td>
                                <td>${classInfo.room}</td>
                            </tr>
                        `);
                    });
                }
            },
            error: function () {
                alert("Failed to load schedule. Please try again later.");
            }
        });
    });

    function getTimeForPeriod(period) {
        const bellSchedule = {
            1: "8:24 AM - 9:31 AM",
            2: "9:36 AM - 10:43 AM",
            3: "10:48 AM - 11:55 AM",
            4: "12:41 PM - 1:48 PM",
            5: "1:53 PM - 3:00 PM"
        };
        return bellSchedule[period] || "Lunch (12:00 PM - 12:35 PM)";
    }
});