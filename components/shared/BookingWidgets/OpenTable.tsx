import useScript from 'customhook/useScript';

interface Props {
  restaurantId: number;
}

export default function OpenTable({ restaurantId }: Props) {
  const url = `//www.opentable.com/widget/reservation/loader?rid=${restaurantId}&type=standard&theme=standard&color=1&iframe=true&domain=com&lang=en-US&newtab=false&ot_source=IRestaurant%20website`;

  useScript(url);

  return <script type="text/javascript" src={url}></script>;
}
