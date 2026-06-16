"use client";

import { Card } from "@/components/ui/card";
import { GraduationCap, TrendingUp, Users, FileBarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CollegeDashboardPage() {
  const students = [
    { id: "S101", name: "Emily Clark", major: "Computer Science", atsAverage: 88, status: "Placed" },
    { id: "S102", name: "David Kim", major: "Information Technology", atsAverage: 72, status: "Searching" },
    { id: "S103", name: "Jessica Alba", major: "Data Science", atsAverage: 91, status: "Interviewing" },
    { id: "S104", name: "Michael Ross", major: "Cybersecurity", atsAverage: 65, status: "Needs Review" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Placement Dashboard</h2>
          <p className="text-muted-foreground mt-1">Monitor student resume performance and hiring statistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 border-l-4 border-l-blue-500">
          <div className="p-3 bg-blue-500/10 rounded-full"><Users className="w-6 h-6 text-blue-500" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold">1,240</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4 border-l-4 border-l-green-500">
          <div className="p-3 bg-green-500/10 rounded-full"><TrendingUp className="w-6 h-6 text-green-500" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Placement Rate</p>
            <p className="text-2xl font-bold">78%</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4 border-l-4 border-l-purple-500">
          <div className="p-3 bg-purple-500/10 rounded-full"><FileBarChart className="w-6 h-6 text-purple-500" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Avg ATS Score</p>
            <p className="text-2xl font-bold">81/100</p>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4 border-l-4 border-l-orange-500">
          <div className="p-3 bg-orange-500/10 rounded-full"><GraduationCap className="w-6 h-6 text-orange-500" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Top Major</p>
            <p className="text-lg font-bold">Comp. Sci.</p>
          </div>
        </Card>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col border-border/50">
        <div className="p-5 border-b border-border/50 bg-muted/20 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Student Roster & Performance</h3>
          <input type="text" placeholder="Search student..." className="h-9 px-3 text-sm rounded-md border border-border/50" />
        </div>
        <div className="p-0 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium sticky top-0">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Major</th>
                <th className="px-6 py-4">Avg ATS Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{student.name} <span className="text-xs text-muted-foreground ml-2">({student.id})</span></td>
                  <td className="px-6 py-4 text-muted-foreground">{student.major}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Progress value={student.atsAverage} className="w-20 h-2" />
                      <span className={student.atsAverage < 75 ? "text-red-500 font-bold" : "text-green-600 font-bold"}>{student.atsAverage}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Placed' ? 'bg-green-500/10 text-green-700' :
                      student.status === 'Needs Review' ? 'bg-red-500/10 text-red-700' :
                      'bg-blue-500/10 text-blue-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-xs font-medium">Review Resume</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
