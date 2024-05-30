import { Student } from "./entities/Student";
import { AppDataSource } from "./entities/datasource";
import { getRepository } from "typeorm";

export async function createStudent(name: string, department: string): Promise<Student> {
    try {
        const student = new Student();
        student.name = name;
        student.department = department;

        return await AppDataSource.getRepository(Student).save(student);
    } catch (error) {
        console.error("Error occurred while creating student:", error);
        throw error;
    }
}

export async function getAllStudents(): Promise<Student[]> {
    try {
        return await AppDataSource.getRepository(Student).find();
    } catch (error) {
        console.error("Error occurred while fetching all students:", error);
        throw error;
    }
}



export async function getStudentById(id: number) {
    try {
        const student = await AppDataSource.getRepository(Student).findOneBy({ id: id });
        return student;
    } catch (error) {
        console.error("Error occurred while fetching student by ID:", error);
        throw error;
    }
}

export async function deleteStudent(id: number) {
    try {
        const studentRepository = AppDataSource.getRepository(Student);
        
      
        const studentToDelete = await studentRepository.findOneBy({ id: id });
        
       
        if (studentToDelete) {
            await studentRepository.remove(studentToDelete);
            return { success: true, message: `Student with ID ${id} deleted successfully` };
        } else {
            return { success: false, message: `Student with ID ${id} not found` };
        }
    } catch (error) {
        console.error("Error while deleting student:", error);
        throw error;
    }
}

export async function updateStudent(id: number, name?: string, department?: string) {
    try {
        const studentRepository = AppDataSource.getRepository(Student);
        const studentToUpdate = await studentRepository.findOneBy({ id: id });

        if (!studentToUpdate) {
            return { success: false, message: `Student with ID ${id} not found` };
        }

        if (name) {
            studentToUpdate.name = name;
        }

        if (department) {
            studentToUpdate.department = department;
        }

        await studentRepository.save(studentToUpdate);
        return { success: true, message: `Student with ID ${id} updated successfully` };
    } catch (error) {
        console.error("Error while updating student:", error);
        throw error;
    }
}
