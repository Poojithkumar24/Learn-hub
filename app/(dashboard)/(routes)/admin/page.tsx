'use client'

import { useState, useEffect } from 'react';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

interface User {
    id: string;
    roll_no: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const users = await prisma.user.findMany();
            setUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            await prisma.user.create({
                data: {
                    roll_no: '123456',
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password',
                    role: UserRole.STUDENT
                }
            });
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Add User</h2>
                <button onClick={handleAddUser} className="px-4 py-2 bg-blue-500 text-white rounded-md">Add User</button>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">User List</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id} className="mb-2">
                            <span>{user.roll_no} - {user.name} ({user.email}) - {user.role}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;
