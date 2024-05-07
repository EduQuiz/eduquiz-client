import Image from "next/image";

interface DashboardTableProps {
  className?: string;
  persons?: Person[];
}

interface Person {
  name: string;
  job: string;
  favoriteColor: string;
}

export default function DashboardTable(props: DashboardTableProps) {
  return (
    <div className={` ${props.className}`}>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {props.persons?.map((person, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          src={"https://source.unsplash.com/random/800x600"}
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{person.name}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  {person.job}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>{person.favoriteColor}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
