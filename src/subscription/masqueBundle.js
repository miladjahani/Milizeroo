import { buildWarpMasqueNodes, WARP_MASQUE_SNI } from './generator.js';
import { BRAND_NAME } from '../config/defaults.js';

// ============================================================================
// بستهٔ مستقل WARP MASQUE (HTTP/3 CONNECT-IP)
// ساب/ZIP جدا از WARP وایرگارد؛ فقط کلاینت‌هایی که نوع masque را می‌شناسند
// (Mihomo/Clash.Meta، FlClash، Clash Verge، Hiddify) آن را می‌خوانند.
// ============================================================================
export async function buildWarpMasqueBundle(cfg = {}, options = {}) {
  const nodes = await buildWarpMasqueNodes(cfg).catch(() => []);
  const seed = String(options.seed || 'public');
  const dnsList = ['1.1.1.1', '1.0.0.1'];
  const files = [];
  const server = nodes[0]?.server || '';
  const count = nodes.length;

  if (count) {
    const proxies = nodes.map(node =>
      `  - { name: "${node.name}", type: masque, server: "${node.server}", port: ${node.port}, ` +
      `private-key: "${node.privateKey}", public-key: "${node.publicKey}", ip: ${node.address4}/32` +
      (node.address6 ? `, ipv6: ${node.address6}/128` : '') +
      `, sni: ${WARP_MASQUE_SNI}, mtu: 1280, udp: true, remote-dns-resolve: true, dns: [${dnsList.join(', ')}] }`
    );
    files.push({
      name: 'WARP-masque.yaml',
      data: [
        `# ${BRAND_NAME} — WARP MASQUE (HTTP/3 CONNECT-IP)`,
        '# مستقل از WARP وایرگارد — فقط Mihomo / Clash.Meta / FlClash / Clash Verge / Hiddify',
        `# edge: ${server} — sni: ${WARP_MASQUE_SNI} — nodes: ${count}`,
        'mixed-port: 7890',
        'allow-lan: false',
        'mode: rule',
        'log-level: warning',
        'dns:',
        '  enable: true',
        '  enhanced-mode: fake-ip',
        '  nameserver:',
        ...dnsList.map(item => `    - ${item}`),
        'proxies:',
        ...proxies,
        'proxy-groups:',
        '  - name: "WARP-MASQUE"',
        '    type: select',
        '    proxies:',
        ...nodes.map(node => `      - "${node.name}"`),
        '      - DIRECT',
        'rules:',
        '  - MATCH,WARP-MASQUE'
      ].join('\n') + '\n'
    });

    files.push({
      name: 'WARP-masque.json',
      data: JSON.stringify({
        brand: BRAND_NAME,
        protocol: 'masque',
        sni: WARP_MASQUE_SNI,
        server,
        nodes: nodes.map(node => ({
          name: node.name,
          server: node.server,
          port: node.port,
          privateKey: node.privateKey,
          publicKey: node.publicKey,
          address4: node.address4,
          address6: node.address6
        }))
      }, null, 2) + '\n'
    });

    files.push({
      name: 'endpoints.txt',
      data: [
        `# ${BRAND_NAME} — WARP MASQUE endpoints`,
        `# sni: ${WARP_MASQUE_SNI}`,
        `# seed: ${seed.slice(0, 8)}`,
        '',
        ...nodes.map(node => `${node.server}\t${node.port}\t${node.name}`)
      ].join('\n') + '\n'
    });
  }

  files.push({
    name: 'README.txt',
    data: [
      `${BRAND_NAME} — WARP MASQUE`,
      '',
      'این بستهٔ جداست: هیچ فایل WireGuard/AmneziaWG داخل آن نیست و برعکس،',
      'بستهٔ اصلی WARP هیچ نود MASQUE ندارد.',
      '',
      'files:',
      '  WARP-masque.yaml ... پروفایل Mihomo / Clash.Meta / FlClash / Clash Verge',
      '  WARP-masque.json ... همان نودها به شکل JSON',
      '  endpoints.txt ...... لیست لبه/پورت',
      '',
      `sni: ${WARP_MASQUE_SNI}`,
      `nodes: ${count}`,
      'اگر کلاینت نوع masque را پشتیبانی نکند، این فایل را وارد نکنید؛',
      'برای کلاینت‌های وایرگارد از ZIP اصلی WARP استفاده کنید.'
    ].join('\n') + '\n'
  });

  return { config: { server, sni: WARP_MASQUE_SNI, nodes: count }, files, nodes };
}
