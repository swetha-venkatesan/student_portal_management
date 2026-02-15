package service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;

import org.springframework.stereotype.Service;

import model.Student;
import model.Course;
import model.Enrollment;
import repository.StudentRepository;
import repository.CourseRepository;
import repository.EnrollmentRepository;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ReportService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public ReportService(StudentRepository studentRepository, 
                        CourseRepository courseRepository,
                        EnrollmentRepository enrollmentRepository) {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public byte[] generateStudentReport() throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        // Title
        Paragraph title = new Paragraph("Student Report")
                .setFontSize(20)
                .setBold()
                .setTextAlignment(TextAlignment.CENTER);
        document.add(title);

        // Student Statistics
        long totalStudents = studentRepository.count();
        document.add(new Paragraph("Total Students: " + totalStudents).setFontSize(14));

        // Student Table
        Table table = new Table(5);
        table.addHeaderCell("ID");
        table.addHeaderCell("Student ID");
        table.addHeaderCell("Name");
        table.addHeaderCell("Email");
        table.addHeaderCell("Department");

        List<Student> students = studentRepository.findAll();
        for (Student s : students) {
            table.addCell(String.valueOf(s.getId()));
            table.addCell(s.getStudentId() != null ? s.getStudentId() : "N/A");
            table.addCell(s.getName());
            table.addCell(s.getEmail());
            table.addCell(s.getDepartment());
        }

        document.add(table);
        document.close();

        return baos.toByteArray();
    }

    public byte[] generateCourseReport() throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        Paragraph title = new Paragraph("Course Report")
                .setFontSize(20)
                .setBold()
                .setTextAlignment(TextAlignment.CENTER);
        document.add(title);

        long totalCourses = courseRepository.count();
        document.add(new Paragraph("Total Courses: " + totalCourses).setFontSize(14));

        Table table = new Table(5);
        table.addHeaderCell("Course Code");
        table.addHeaderCell("Course Name");
        table.addHeaderCell("Instructor");
        table.addHeaderCell("Credits");
        table.addHeaderCell("Semester");

        List<Course> courses = courseRepository.findAll();
        for (Course c : courses) {
            table.addCell(c.getCourseCode());
            table.addCell(c.getCourseName());
            table.addCell(c.getInstructor() != null ? c.getInstructor() : "N/A");
            table.addCell(c.getCredits() != null ? String.valueOf(c.getCredits()) : "N/A");
            table.addCell(c.getSemester() != null ? c.getSemester() : "N/A");
        }

        document.add(table);
        document.close();

        return baos.toByteArray();
    }

    public byte[] generateEnrollmentReport() throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        Paragraph title = new Paragraph("Enrollment Report")
                .setFontSize(20)
                .setBold()
                .setTextAlignment(TextAlignment.CENTER);
        document.add(title);

        long totalEnrollments = enrollmentRepository.count();
        document.add(new Paragraph("Total Enrollments: " + totalEnrollments).setFontSize(14));

        Table table = new Table(4);
        table.addHeaderCell("Student ID");
        table.addHeaderCell("Course ID");
        table.addHeaderCell("Status");
        table.addHeaderCell("Grade");

        List<Enrollment> enrollments = enrollmentRepository.findAll();
        for (Enrollment e : enrollments) {
            table.addCell(String.valueOf(e.getStudentId()));
            table.addCell(String.valueOf(e.getCourseId()));
            table.addCell(e.getStatus());
            table.addCell(e.getGrade() != null ? e.getGrade() : "Not Graded");
        }

        document.add(table);
        document.close();

        return baos.toByteArray();
    }
}