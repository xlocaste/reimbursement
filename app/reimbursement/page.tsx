import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

type Reimbursements = {
  id: number
  tanggal: string
  deskripsi: string
  jumlah: number
  status: string
  tanggal_approval: string
  approvalBy: {
    name: string
  }
  user: {
    name: string
  }
}

export default async function page () {
  const response = await fetch('http://127.0.0.1:8000/api/reimbursement')
  const result = await response.json();
  const reimbursements: Reimbursements[] = result.data;
  console.log(reimbursements)

  return (
    <div className="p-10 w-full">
      <table className="bg-gray-100 w-full border-2 rounded-2xl border-separate">
        <thead className="">
          <tr className="">
            <th className="p-4">Nama</th>
            <th>Tanggal</th>
            <th>Deskripsi</th>
            <th>Jumlah</th>
            <th>Status</th>
            <th>Tanggal Approval</th>
            <th>Approval By</th>
            <th>Action</th>
          </tr> 
        </thead>
        <tbody>
          {reimbursements.map((reimbursement) => (
            <tr key={reimbursement.id} className="text-center">
              <td className="p-2">{reimbursement.user.name}</td>  
              <td className="p-2">{reimbursement.tanggal}</td>
              <td className="p-2">{reimbursement.deskripsi}</td>
              <td className="p-2">{reimbursement.jumlah}</td>
              <td className="p-2">{reimbursement.status}</td>
              <td className="p-2">{reimbursement.tanggal_approval}</td>
              <td className="p-2">{reimbursement.approvalBy.name || "Belum Di Approve"}</td>
              <td>
                <Link href={`/reimbursement/${reimbursement.id}`}>
                  <button className="bg-orange-500 text-white rounded-md py-2 px-4 hover:bg-orange-700"><FaRegEdit /></button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}