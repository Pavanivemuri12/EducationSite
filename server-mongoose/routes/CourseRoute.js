const express = require("express");
const router = express.Router();
const Course = require("../models/courses");

// Create a new course
router.post("/add", async (req, res) => {
    try {
        const { courseName, thumbnailUrl, videoUrl } = req.body;
        const course = new Course({ courseName, thumbnailUrl, videoUrl });
        await course.save();
        res.status(201).json({ message: "Course added successfully!" });
    } catch (error) {
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

// **Update a course by ID**
router.put("/edit/:id", async (req, res) => {
    try {
        const { courseName, thumbnailUrl, videoUrl } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { courseName, thumbnailUrl, videoUrl },
            { new: true } // Return the updated course
        );
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course updated successfully!", updatedCourse });
    } catch (error) {
        res.status(500).json({ error: "Failed to update course" });
    }
});

// Delete a course by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete course" });
    }
});

module.exports = router;
