import { styled } from '@mui/system';
import Member2 from 'assets/avatars/avatar-ciro.png';
import Member3 from 'assets/avatars/avatar-damien.png';
import Member4 from 'assets/avatars/avatar-nial.png';
import Member1 from 'assets/avatars/avatar-nicola-ghost.png';
import styles from 'assets/styles/MyTeam.module.scss';
import { Link } from 'react-router-dom';

const LinkStyled = styled(Link)({
  color: '#f5a65b',
  textDecoration: 'none',
  transition: 'color 0.25s linear 0s',
});

const PERSON_LIST = [
  { name: 'Kim Chan', job: 'Member', ava: Member1 },
  { name: 'Quang Vinh', job: 'Member', ava: Member2 },
  { name: 'Quoc Kiet', job: 'Member', ava: Member3 },
  { name: 'Viet Anh', job: 'Member', ava: Member4 },
];

export function MyTeam() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.header_title}>About us</h1>
        <p className={styles.header_description}>
          We are a team gathered to do a fun project in the CAPSTONE 1 SE <br />
          Our team is guided by <strong>Dr. Dang Viet Hung</strong>
        </p>
        <p className={styles.header_latestProject}>
          Our project is <LinkStyled to="/">Web Practice</LinkStyled>
        </p>
      </header>

      <section className={styles.team}>
        <div className={styles.lineText}>
          <span>Team</span>
        </div>

        <div className={styles.team_inner}>
          {PERSON_LIST.map((person) => (
            <div key={person.name} className={styles.person}>
              <img src={person.ava} className={styles.person_avatar} alt="" />
              <div className={styles.person_name}>{person.name}</div>
              <div className={styles.person_job}>{person.job}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
