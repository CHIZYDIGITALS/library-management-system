import { useState } from "react";

function SpaceBookingPage() {
  const [formData, setFormData] = useState({
    spaceId: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Booking form submitted successfully!");

    console.log("Booking details:", formData);
  }

  return (
    <div className="space-booking-page">
      <h1>Book a Library Space</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="spaceId">Select Space</label>

          <select
            id="spaceId"
            name="spaceId"
            value={formData.spaceId}
            onChange={handleChange}
            required
          >
            <option value="">Choose a space</option>
            <option value="reading-room">Reading Room</option>
            <option value="study-room">Study Room</option>
            <option value="meeting-room">Meeting Room</option>
          </select>
        </div>

        <div>
          <label htmlFor="date">Booking Date</label>

          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="startTime">Start Time</label>

          <input
            id="startTime"
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="endTime">End Time</label>

          <input
            id="endTime"
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}

export default SpaceBookingPage;
