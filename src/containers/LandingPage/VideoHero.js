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
          src="https://utfs.io/f/91fda1c9-5823-4815-8952-a6fce50c6f49-jorl4s.mp4"
          type="video/mp4"
        />
      </video>
      <div className={css.heroContentWrapper}>
        <div className={css.heroContent}>
          <h1>Andean excellence in a B2B ecommerce platform.</h1>
          <h3>
          The Andino provides buyers with the finest suppliers from the Andean region.
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