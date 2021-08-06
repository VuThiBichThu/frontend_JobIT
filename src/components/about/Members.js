import React from "react";
import Member from "../common/Member";

import duyan from "../../assets/images/members/duyan-member.png";
import bichthu from "../../assets/images/members/bichthu-member.png";
import trongduc from "../../assets/images/members/trongduc-member.png";
import trungnam from "../../assets/images/members/trungnam-member.png";
import quangphieu from "../../assets/images/members/quangphieu-member.png";

function Members() {
  return (
    <section className="about_member">
      <div className="about_member__inner ">
        <div className="about_member__inner__text">
          <div className="text__title">
            <h2 className="h2">
              Meet <span className="primary">our management team</span>{" "}
            </h2>
            <div className="members">
              <Member name="Duc Thang" avt={trongduc} />
              <Member name="Bich Thu" avt={bichthu} />
              <Member name="Trung Nam" avt={trungnam} />
              <Member name="Duy An" avt={duyan} />
              <Member name="Huu Phuoc" avt={quangphieu} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Members;
