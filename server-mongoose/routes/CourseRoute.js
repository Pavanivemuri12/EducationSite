const express = require("express");
const multer = require("multer");
const { Readable } = require("stream");
const cloudinary = require("../utils/cloudinary");
const Course = require("../models/courses");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new course with video upload
router.post("/add", upload.single("video"), async (req, res) => {
  try {
    const { courseName, thumbnailUrl } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    // Upload video to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: "courses" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Cloudinary upload failed" });
        }

        // Save course with video URL
        const course = new Course({
          courseName,
          thumbnailUrl,
          videoUrl: result.secure_url,
        });

        await course.save();
        res.status(201).json({ message: "Course added successfully!", course });
      }
    );

    // Create a readable stream from multer buffer and pipe to Cloudinary
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);

    bufferStream.pipe(uploadStream);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Failed to add course" });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Get a single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

// Update a course
router.put("/edit/:id", async (req, res) => {
  try {
    const { courseName, thumbnailUrl, videoUrl } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { courseName, thumbnailUrl, videoUrl },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course updated successfully!", updatedCourse });
  } catch (error) {
    res.status(500).json({ error: "Failed to update course" });
  }
});

// Delete a course
router.delete("/delete/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete course" });
  }
});

module.exports = router;
