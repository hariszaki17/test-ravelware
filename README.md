# test-ravelware

**Membuat tiket (Create ticket)**
----
  Returns json data about a single ticket that recently added.

* **URL**

  /check-in

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

```javascript
 {
     "platNomor": "B 1234 KI", ​"warna": "hitam", "tipe": "SUV"
 }
 ```

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** `{ "platNomor": "B 1234 KI","parkingLot": "A1", "tanggalMasuk": "2020-07-22 12:26" }`

  OR

  * **Code:** 200 OK <br />
    **Content:** `{ name: 'OutOfSpace', info: [{ message: 'Parking lot is out of space' }] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors: [{ message: 'All object properties cannot be null' }] }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors: [{ message: 'Invalid object properties' }] }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors: [{ message: 'Type property is invalid' }] }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errors : [{message: "Internal Server Error."}] }`

 **Request Header:**

  None
 -----------------------------------------------------------------------------------

**Mengubah data spesifik dari tiket dan tempat parkir (Update ticket and parking lot)**
----
  Returns json data about single ticket that recently checked out.

* **URL**

  /check-out

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

```javascript
 {
     "platNomor": "B 1234 KI"
 }
 ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "platNomor": "B 1234 KI", "tanggalMasuk": "2020-07-22 06:55", "tanggalKeluar": "2020-07-22 12:26", "jumlahBayar": 30000 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ errors : [{ message: "Police number does'nt exists" }]}`

 **Request Header:**

  None
 -----------------------------------------------------------------------------------

 **Membaca jumlah data kendaraan terparkir berdasarkan tipe (Read parked vehicle by type)**
----
  Returns amount of parked vehicle based on type.

* **URL**

  /vehicle-count

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

```javascript
 {
      "tipe": "SUV"
 }
 ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "jumlahKendaraan": 3 }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errors : [{ message: "Internal Server Error." }] }`

 **Request Header:**
  
  None
 -----------------------------------------------------------------------------------

  **Membaca data kendaraan berdasarkan warna(Read vehicle by color)**
----
  Returns data object consist with array of police number.

* **URL**

  /vehicle-data

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

```javascript
 {
      "warna": "hitam"
 }
 ```

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "platNomor": [ "B 4312 PO" ]}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ errors : [{ message: "Internal Server Error." }] }`

 **Request Header:**

  None
 -----------------------------------------------------------------------------------

 