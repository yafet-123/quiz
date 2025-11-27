import Image from "next/image";
import Category from "../../../../components/books/Category";
import { MainHeader } from '../../../../components/common/MainHeader';
import React from "react";
export default function Books() {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Government Book Page" />
      <div className="bg-gray-50 min-h-screen">
        <Category />
      </div>
    </React.Fragment>
  );
}
