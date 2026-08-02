const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "eyebrowFont": "sans",
  "eyebrowUpper": true,
  "brand": ["#08A78C", "#067A66", "#1ED3AE", "#E7F5F1"],
  "radius": 14
}/*EDITMODE-END*/;

const BRAND_PALETTES = [
  ["#08A78C", "#067A66", "#1ED3AE", "#E7F5F1"], // Teal (actual)
  ["#1F8A5B", "#15663F", "#34C77E", "#E7F4EC"], // Verde seguridad
  ["#0E8C9E", "#0A6675", "#1FC6D8", "#E4F4F6"]  // Petróleo
];

function GreenCloudTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const root = document.documentElement;

  React.useEffect(() => {
    root.style.setProperty('--eyebrow-font', t.eyebrowFont === 'mono' ? 'var(--mono)' : 'var(--sans)');
  }, [t.eyebrowFont]);

  React.useEffect(() => {
    root.style.setProperty('--eyebrow-case', t.eyebrowUpper ? 'uppercase' : 'none');
    root.style.setProperty('--eyebrow-tracking', t.eyebrowUpper ? '.12em' : '.005em');
    root.style.setProperty('--eyebrow-weight', '600');
  }, [t.eyebrowUpper]);

  React.useEffect(() => {
    const [c, deep, bright, tint] = t.brand;
    root.style.setProperty('--teal', c);
    root.style.setProperty('--teal-deep', deep);
    root.style.setProperty('--teal-bright', bright);
    root.style.setProperty('--teal-tint', tint);
  }, [t.brand]);

  React.useEffect(() => {
    root.style.setProperty('--radius', t.radius + 'px');
    root.style.setProperty('--radius-s', Math.max(4, t.radius - 4) + 'px');
  }, [t.radius]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Subtítulos (eyebrow)" />
      <TweakRadio label="Tipografía" value={t.eyebrowFont}
        options={[{label:'Sans', value:'sans'}, {label:'Mono', value:'mono'}]}
        onChange={(v) => setTweak('eyebrowFont', v)} />
      <TweakToggle label="Mayúsculas" value={t.eyebrowUpper}
        onChange={(v) => setTweak('eyebrowUpper', v)} />

      <TweakSection label="Marca" />
      <TweakColor label="Color" value={t.brand} options={BRAND_PALETTES}
        onChange={(v) => setTweak('brand', v)} />

      <TweakSection label="Forma" />
      <TweakSlider label="Radio de tarjetas" value={t.radius} min={4} max={22} unit="px"
        onChange={(v) => setTweak('radius', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<GreenCloudTweaks />);
