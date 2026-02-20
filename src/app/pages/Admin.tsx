import { useApp } from '../context/AppContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

export default function Admin() {
  const { projects } = useApp();

  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === 'Completado').length;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-[1248px] mx-auto">
        {/* Header */}
        <div className="border-2 border-black px-6 py-5 mb-8">
          <h1 className="text-base font-bold">GdC — Vista Admin (solo internos)</h1>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="border-2 border-black p-6">
            <p className="text-sm font-bold mb-2">Total proyectos</p>
            <p className="text-4xl font-extrabold">{totalProjects}</p>
          </div>

          <div className="border-2 border-black p-6">
            <p className="text-sm font-bold mb-2">Finalizados (3/3)</p>
            <p className="text-4xl font-extrabold">{completedProjects}</p>
          </div>

          <div className="border-2 border-black p-6">
            <p className="text-sm font-bold mb-2">En progreso</p>
            <p className="text-4xl font-extrabold">
              {totalProjects - completedProjects}
            </p>
          </div>
        </div>

        {/* Projects Table */}
        <div className="border-2 border-black">
          <div className="p-4 border-b-2 border-black">
            <h2 className="text-sm font-bold">Proyectos activos</h2>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-black">
                <TableHead className="font-bold border-r-2 border-black">Proyecto</TableHead>
                <TableHead className="font-bold border-r-2 border-black">Responsable</TableHead>
                <TableHead className="font-bold border-r-2 border-black">Estado</TableHead>
                <TableHead className="font-bold border-r-2 border-black">Fase</TableHead>
                <TableHead className="font-bold">Última actividad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="border-black">
                  <TableCell className="border-r-2 border-black font-medium">
                    {project.name}
                  </TableCell>
                  <TableCell className="border-r-2 border-black">
                    {project.responsible}
                  </TableCell>
                  <TableCell className="border-r-2 border-black">
                    <span
                      className={`px-2 py-1 text-xs font-semibold ${
                        project.status === 'Completado'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell className="border-r-2 border-black">{project.phase}</TableCell>
                  <TableCell>{project.lastActivity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {projects.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No hay proyectos registrados
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
