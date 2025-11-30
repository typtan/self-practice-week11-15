
console.log("========Synchronous=========");
// 1. Synchronous คำสั่งถัดไปจะไม่ถูกประมวลผล ถ้าบรรทัดก่อนหน้ายังไม่เสร็จสิ้น
console.log('hello ')
console.log('world, ')
console.log('bye')

/* output
hello 
world, 
bye 
*/

console.log("starting...")
console.log("working...")
console.log("ending...")

/* output
starting...
working...
ending... 
*/

console.log("========Asynchronous=========");
// 2. Asynchronous จะไม่รอคำสั่งไหนประมวล มันจะข้ามไปทำงานอื่นก่อนแล้วค่อยกลับมาทำงานนั้นต่อ
console.log('hello ')
setTimeout(() => console.log('world, '), 3000)
console.log('bye')

/* output
hello 
bye
world,  
*/

console.log("starting...")
setTimeout(() => console.log("working..."), 1000) // callback function ข้ามไปก่อน setTimeout คือ Asynchronous
console.log("ending...")

/* output
starting...
ending...
working... 
*/

console.log("========Promises=========");

// 3. Promises ( เป็น Asynchronous เหมือน setTimeout ) คำสัญญาต้องเป็นสัญญา function นั้นจะต้องทำงานให้สำเร็จไม่ก็ fail แล้วส่งคืนกลับค่ามา promises แล้วก็ promises เป็นชื่อ class ซึ่งมี 3 states 
// pending -> เรียกผลลัพธ์จาก function
// fulfilled -> สถานะถูกเปลี่ยนเป็นสำเร็จ ไม่มี error
// rejected -> fail ก็คือ promises ทำงานไม่สำเร็จ

// ลักษณะคล้าย fetch api
// nonhandle promise
function doSomething(hasResource){ // รับ param
    return new Promise((resolve,reject) => { // param ของ Promise บังคับรับสองตัว
        setTimeout(() => (hasResource ? resolve("done") : reject("fail")), 5000) // ถ้า resolve (ตอนมันเป็น fulfilled) คืน str done ส่วนถ้า reject (ตอนมันเป็น rejected) คืน str fail แล้วหน่วงเวลาไว้ 5 วิ
    })
}

console.log("starting...");
const workStatusF = doSomething(false)// show error the promise rejected with the reason "fail"
console.log(workStatusF);
console.log("ending...");

/* output ตัวอย่างเขียน program ที่มีปัญหา
starting...
Promise { <pending> }
ending... 
fail, throw expection
*/

console.log("starting...");
const workStatusT = doSomething(true) // คืนค่าเลย
console.log(workStatusT);
console.log("ending...");

// handle promise -- 2 วิธี ((1) .then().catch() , (2) async - await)
// 1) .then().catch()
console.log("starting...")

doSomething(false)
    .then((result) => { // หลัง then คือต้องทำงานก่อนหน้าให้เสร็จก่อนมันถึงจะทำได้
        console.log("working...");
        console.log(`work status= ${result}`);
        console.log("ending");
    })
    .catch((error) => { // วิ่งเข้า catch
        console.log(error); 
    })

// 2) async - await ถ้าไม่มี await คือไม่รอ
async function working() {
    console.log("starting...")
    try {
        const workStatus = await doSomething(false) // รอ ถ้าใช้ await ต้องอยู่ใต้ function และมี async
        console.log(workStatus)
        console.log("ending...")
    }catch (error) {
        console.log(error);
    }   
}
working()


// REST API (CRUD) การส่งข้อมูลติดต่อไปที่เครื่อง server ใช้ format JSON
// post -> สร้างข้อมูล
// get -> อ่านข้อมูล เป็น default ถ้าไม่ได้ใส่ method คือหมายถึง get
// put -> update ข้อมูลทั้งหมด
// patch -> update ข้อมูลบางส่วน
// delete -> ลบข้อมูล

// fetch() method function ติดต่อกับ server 
// fetch(resource [, init]) return promises