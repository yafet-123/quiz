import Image from "next/image";
import Subject from "../../../../components/books/Subject";
import { MainHeader } from '../../../../components/common/MainHeader';
import React from "react";

export default function Books() {
  return (
    <React.Fragment>
      <MainHeader title="Save My Exam : Book Page" />
      <div className="bg-gray-50 min-h-screen">
        <Subject />
      </div>
    </React.Fragment>
  );
}
