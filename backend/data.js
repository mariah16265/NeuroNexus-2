import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Mariah',
      email: 'mariah16265@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Syeda',
      email: 'syeda@example.com',
      password: bcrypt.hashSync('654321'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Foaming Cleanser ',
      slug: 'CeraVe-fomaing-cleasner',
      category: 'SkinCare',
      image: '/images/p1.jpg',
      countInStock: 10,
      price: 74.98,
      brand: 'CeraVe',
      rating: 3.85,
      numReviews: 410,
      description:
        'CeraVe Foaming Facial Cleanser features ceramides, hyaluronic acid, and niacinamide, and is formulated to help to maintain your skin’s protective barrier, lock in moisture, and calm your skin.',
    },
    {
      // _id: '2',
      name: 'Moisturising Lotion',
      slug: 'Cetaphil-mosituirising-lotion',
      category: 'SkinCare',
      image: '/images/p2.jpg',
      countInStock: 10,
      price: 190,
      brand: 'Cetaphil',
      rating: 4.45,
      numReviews: 320,
      description:
        '\n Specially formulated with a dermatologist-backed blend of niacinamide (vitamin B3), panthenol (vitamin B5) and hydrating glycerin to improve the resilience of sensitive skin.',
    },
    {
      // _id: '3',
      name: 'Advanced Night Repair',
      slug: 'estee-lauder-advanced-night-repair',
      category: 'SkinCare',
      image: '/images/p3.jpg',
      countInStock: 10,
      price: 325,
      brand: 'ESTEE LAUDER',
      rating: 4.95,
      numReviews: 650,
      description:
        'Harness the restorative power of night. This deep- and fast-penetrating face serum, with our exclusive Night Peptide, boosts 7 key skin-renewing actions. Reduces the look of multiple signs of aging. Skin looks smoother and less lined, younger, healthier—more radiant and even toned.',
    },
    {
      // _id: '4',
      name: 'Eye Repair Cream',
      slug: 'CeraVe-eye-repair-cream',
      category: 'SkinCare',
      countInStock: 0,
      image: '/images/p4.jpg',
      price: 80,
      brand: 'CeraVe',
      rating: 4.3,
      numReviews: 100,
      description:
        'CeraVe Eye Repair Cream is ophthalmologist-tested and features a non-greasy, fast-absorbing, fragrance-free formula that works to minimize the appearance of dark circles and eye puffiness. ',
    },
    //   {
    //     name: 'ISNTREE Hyaluronic Airy SunStick',
    //     slug: 'ISNTREE-sunscrren',
    //     category: 'SkinCare',
    //     image: '/images/p5.jpeg',
    //     price: 55,
    //     brand: 'ISNTREE',
    //     rating: 4.95,
    //     numReviews: 10,
    //     description: 'Moisturising and light weight',
    //   },
    //   {
    //     name: 'Tretinoin Cream ',
    //     slug: 'Tretinoin',
    //     category: 'SkinCare',
    //     image: '/images/p6.jpg',
    //     price: 190,
    //     brand: 'Tretinoin',
    //     rating: 4.5,
    //     numReviews: 10,
    //     description: 'Extremely Hydrating',
    //   },
  ],
};
export default data;
