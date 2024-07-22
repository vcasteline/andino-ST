import { Button, NamedLink, PrimaryButton } from '../../components';
import React from 'react';
import { TabSearch } from '../../components/TabSearch/TabSearch';
import css from './VideoHero.module.css';
import { ListRedirect } from '../../components/ListRedirect/ListRedirect';

export const VideoHero = () => {
  return (
    <div className={css.heroSection}>
      <video autoPlay loop muted className={css.heroVideo}>
        <source
          src="https://utfs.io/f/0a99a5f5-8b44-4f02-821f-ff4ab9a3c78f-spwb07.mov"
          type="video/mp4"
        />
      </video>
      <div className={css.heroContentWrapper}>
        <div className={css.heroContent}>
          <h1>Discover the best of the Andes in a B2B marketplace.</h1>
          <h3>
            Leveraging the power of the internet to connect producers from the Andean region within
            South America with buyers all across the U.S.
          </h3>
          <TabSearch />
          {/* <a className={css.buttonLink} href="/s">
          Shop Now
        </a> */}
          <ListRedirect data={categories} />

        </div>
      </div>
    </div >
  );
};

const categories = [
  {
    name: "Clay Pavers",
    url: "clay-construction-products"
  },
  {
    name: "Pima Cotton Towels",
    url: "pima-cotton-products"
  },
  {
    name: "Andean Roses",
    url: "floricultural-products"
  },
]