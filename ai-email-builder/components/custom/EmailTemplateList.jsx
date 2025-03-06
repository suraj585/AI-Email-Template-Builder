import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

function EmailTemplateList() {
  const [emaillList, setEmailList] = useState([]);
  return (
    <div>
      <h2 className="font-bold text-xl text-primary mt-6">Workspace</h2>
      {emaillList?.length == 0 && (
        <div className="flex justify-center mt-7 flex-col items-center">
          <Image src={"/email.png"} alt="email" height={250} width={250} />
          <Link href={"/dashboard/create"}>
            <Button className="mt-7">+ Create New</Button>
          </Link> 
        </div>
      )}
    </div>
  );
}

export default EmailTemplateList