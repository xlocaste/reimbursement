'use client'
import React, { useState } from "react";

export default function Edit({ id }: { id: string}) {
    const [status, setStatus] = useState("")
    const updateData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/reimbursement/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: status
          }),
        });
      
        const result = await response.json();
        console.log(result);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateData()
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-2"
                    >
                        <option value="">Pilih Status</option>
                        <option value="disetujui">Setujui</option>
                        <option value="ditolak">Tolak</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                >
                    Simpan
                </button>
            </form>
        </div>
    )
}