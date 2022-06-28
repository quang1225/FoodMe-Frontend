import useScript from 'customhook/useScript';

interface Props {
  restaurantId: number;
  api_key: number;
}

export default function Resy({ restaurantId, api_key }: Props) {
  useScript('https://widgets.resy.com/embed.js');
  useScript(
    `resyWidget.addButton(document.getElementById('resyButton'), {
    venueId: ${restaurantId},
    apiKey: ${api_key},
    replace: true,
  });`,
    true,
  );

  return <div id="resyButton"></div>;
}
