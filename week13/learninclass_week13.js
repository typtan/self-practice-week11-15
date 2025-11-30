
// Date object
// 1. display current time
const today = new Date()
console.log(today); // 2025-11-18T07:01:11.230Z
console.log(today.getTime()); // return millisecond 1763449471766

// 2. input parameter - millisecond
const now = Date.now()
console.log(now); // 1763449271235

const now2 = new Date(now)
console.log(now2); // 2025-11-18T07:04:31.770Z

// 3. input parameter - date string
const utcDate = new Date("2025-11-18T10:30:00z") // มี z มาตรฐานสากล ใส่เปน str ได้ ปีเดือนวัน
console.log(utcDate); // 2025-11-18T10:30:00.000Z
const localDate = new Date("2025-11-18T10:30:00") // เวลาตาม local ไทยแปลงเป็นสากล +7
console.log(localDate); // 2025-11-18T03:30:00.000Z


// get user date time
const systemOptions = new Intl.DateTimeFormat().resolvedOptions()
console.log(systemOptions.timeZone);// e.g., " Asia/Bangkok"
console.log(systemOptions.locale); // en-US

 
