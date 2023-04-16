import { exposeWorker } from 'react-hooks-worker';
import Localbase from "localbase";
let db = new Localbase("hmctdb");
db.config.debug = false;


function formatNumber(num) {
    if (num % 1 === 0) return num.toString();
    else return num.toFixed(2);
}

const generateReports = async(lastReportDateString)=>{
    try{
        if(!lastReportDateString) return {success:false, msg: 'Internal Server Error!'}

        const lastReportDate = new Date(lastReportDateString);
        const today = new Date(); const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
        
        if(yesterday < lastReportDate) return {success:false, msg: 'No pending reports to be generated'};


        let reservationData = await db.collection('reservation').get();

        for (let date = lastReportDate; date <= yesterday; date.setDate(date.getDate() + 1)) {
            let reportDate = date;
            let reportDateString = date.toISOString().slice(0, 10);


            // ======================   Check for total checkin and rem checkin   ===============================
            let checkinData = reservationData.filter((booking) => booking.arrivaldate === reportDateString); 

            let checkedInPercentage = 0;
            let notCheckedInPercentage = 0;
            if(checkinData.length){
                const numCheckedIn = checkinData.reduce((count, booking) => {
                    return count + (booking.checkedinstatus==="done" ? 1 : 0);
                }, 0);

                const numNotCheckedIn = checkinData.length - numCheckedIn;
                checkedInPercentage = (numCheckedIn / checkinData.length) * 100;
                notCheckedInPercentage = (numNotCheckedIn / checkinData.length) * 100;
            }
            // -----------------------   End of Check for total checkin and rem checkin   ------------------------



            // ======================   Check for total checkout and rem checkout   ===============================
            let checkoutData = reservationData.filter((booking) => booking.departuredate === reportDateString); 

            let checkedOutPercentage = 0;
            let notCheckedOutPercentage = 0;
            if(checkoutData.length){
                const numCheckedOut = checkoutData.reduce((count, booking) => {
                    return count + (booking.checkedoutstatus==="done" ? 1 : 0);
                }, 0);

                const numNotCheckedOut = checkoutData.length - numCheckedOut;
                checkedOutPercentage = (numCheckedOut / checkoutData.length) * 100;
                notCheckedOutPercentage = (numNotCheckedOut / checkoutData.length) * 100;
            }
            // -----------------------   End of Check for total checkout and rem checkout   ------------------------



            // ===============================   Total Number of rooms booked   ======================================
            let totalBookedRooms = 0;
        
            for (let booking of reservationData) {
                if (booking.bookingdate === reportDateString) {
                    const numRoomsBooked = parseInt(booking.noofrooms, 10);
                    totalBookedRooms += numRoomsBooked;
                }
            }
            // ------------------------------   End of Total Number of rooms booked   ---------------------------------



            //  ==============================   No of room available and occupied    ====================================
            let totalRooms = 54;
            let dirtyrm = 5;
            let avrooms = totalRooms - dirtyrm;
            
            const filteredCheckinBookings = reservationData.filter(booking =>
                ((booking.arrivaldate === reportDateString && booking.checkedinstatus  === "done"))
            );
            
            let checkinoccupiedRooms = 0;
            for (let i = 0; i < filteredCheckinBookings.length; i++) {
              checkinoccupiedRooms += parseInt(filteredCheckinBookings[i].noofrooms);
            }
            
            const filteredCheckoutBookings = reservationData.filter(booking =>
                ((booking.departuredate === reportDateString && booking.checkedoutstatus === "done"))
            );
            
            let checkoutreleaseRooms = 0;
            for (let i = 0; i < filteredCheckoutBookings.length; i++) {
              checkoutreleaseRooms += parseInt(filteredCheckoutBookings[i].noofrooms);
            }

            let totaloccupied = checkinoccupiedRooms - checkoutreleaseRooms;
            let occupiedpercentage = (totaloccupied/totalRooms)*100;
            avrooms = avrooms - totaloccupied;


            let prevdate = new Date();
            prevdate.setDate(reportDate.getDate()-1);
            let prevdatestring = prevdate.toISOString().slice(0, 10);
            let prevdatedata = await db.collection("reports").doc({date: prevdatestring}).get();
            if(prevdatedata){
                avrooms = parseInt(prevdatedata.noofavailableroom); 
                totaloccupied = totaloccupied + parseInt(prevdatedata.noofoccupiedrooms);
                occupiedpercentage = (totaloccupied/totalRooms)*100;
                avrooms = avrooms - checkinoccupiedRooms + checkoutreleaseRooms;
            }

            const totalRoomOccupied = totaloccupied;
            const roomoccupiedPercentage = occupiedpercentage;
            const availableRooms = avrooms;
            //  -------------------------------   End of No of room available and occupied    --------------------------------



            //   =============================  No of rooms dirty and in maintainance   ========================================
            //   As there is no such method yet to mark a room dirty or maintainance so this value will be hard coded 
            let roomsinMaintainance = 0;
            let roomsDirty = 5;
            //   ------------------------------  End of No of rooms dirty and in maintainance   --------------------------------



            //  ===============================   Rupees 100 ADR   ==============================================
            let rupeesadr = 0;
            let rupeesadrData = await db.collection('rupeesadr').doc({ date: reportDateString }).get();
            if(rupeesadrData){
                rupeesadr = rupeesadrData.value;
            }
            //  -------------------------------  End of Rupees 100 ADR   ----------------------------------------



            // Save generated data in db
            let reportsData = await db.collection("reports").doc({date: reportDateString}).get();
            if(!reportsData){
                await db.collection('reports').add({
                    date: reportDateString, totalcheckin: formatNumber(checkedInPercentage), checkinrem: formatNumber(notCheckedInPercentage),
                    totalcheckout: formatNumber(checkedOutPercentage), checkoutrem: formatNumber(notCheckedOutPercentage), noofoccupiedrooms: formatNumber(totalRoomOccupied), roomoccupiedpercentage: formatNumber(roomoccupiedPercentage),
                    rupeesadr: formatNumber(rupeesadr), noofavailableroom: formatNumber(availableRooms), noofroomsbooked: formatNumber(totalBookedRooms),
                    noofroomsmaintainance: formatNumber(roomsinMaintainance), noofroomsdirty: formatNumber(roomsDirty)});
            }
        }

        return {success:true, msg: 'reports generated'}
    }catch(e){
        return {success:false, msg: 'Internal Server Error', err: e}
    }
}

exposeWorker(generateReports);