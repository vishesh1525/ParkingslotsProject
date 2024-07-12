import React from 'react'
const cardData = [
    {
      imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
      title: "A1",
      description: "If a dog chews shoes whose shoes does he choose?",
    },
    {
        imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Shoes!",
        description: "If a dog chews shoes whose shoes does he choose?",
      },
      {
        imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Shoes!",
        description: "If a dog chews shoes whose shoes does he choose?",
      },
      {
        imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Shoes!",
        description: "If a dog chews shoes whose shoes does he choose?",
      },
      {
        imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Shoes!",
        description: "If a dog chews shoes whose shoes does he choose?",
      },
      {
        imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Shoes!",
        description: "If a dog chews shoes whose shoes does he choose?",
      },
      {
        imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Shoes!",
        description: "If a dog chews shoes whose shoes does he choose?",
      },
      {
        imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Shoes!",
        description: "If a dog chews shoes whose shoes does he choose?",
      },
      {
        imgSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        title: "Shoes!",
        description: "If a dog chews shoes whose shoes does he choose?",
      },
    // Add more card data objects here to make a total of 10
  ];
const Card = ({ imgSrc, title, description }) => (
    <div className="card card-compact bg-base-100 w-50 shadow-xl">
      <figure>
        <img src={imgSrc} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Rserve Now</button>
        </div>
      </div>
    </div>
  );
export default function Contact() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cardData.map((card, index) => (
          <Card
            key={index}
            imgSrc={card.imgSrc}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

    );
}