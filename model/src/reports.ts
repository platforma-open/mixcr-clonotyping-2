import { z } from 'zod';

export const ImmuneChain = z.union([
  z.literal(''),
  z.literal('TRA'),
  z.literal('TRAD'),
  z.literal('TRB'),
  z.literal('TRG'),
  z.literal('TRD'),
  z.literal('IGH'),
  z.literal('IGK'),
  z.literal('IGL'),
]);

export type ImmuneChain = z.infer<typeof ImmuneChain>;

// Fixed ordering for immune chains
export const ImmuneChains = ImmuneChain.options.map((o) => o.value);

export const NotAlignedReason = z.union([
  z.literal('NoHits'),
  z.literal('FailedAfterAOverlap'),
  z.literal('NoCDR3Parts'),
  z.literal('NoVHits'),
  z.literal('NoJHits'),
  z.literal('VAndJOnDifferentTargets'),
  z.literal('LowTotalScore'),
  z.literal('NoBarcode'),
  z.literal('SampleNotMatched'),
]);
export type NotAlignedReason = z.infer<typeof NotAlignedReason>;

export const AlignmentChannel = z.union([
  z.literal('Success'),
  z.literal('NoHits'),
  z.literal('NoCDR3Parts'),
  z.literal('NoVHits'),
  z.literal('NoJHits'),
  z.literal('VAndJOnDifferentTargets'),
  z.literal('LowTotalScore'),
  z.literal('NoBarcode'),
]);
export type AlignmentChannel = z.infer<typeof AlignmentChannel>;

/* Ordered list of channels */
export const AlignmentChannels = [
  'Success',
  'NoHits',
  'NoCDR3Parts',
  'NoVHits',
  'NoJHits',
  'VAndJOnDifferentTargets',
  'LowTotalScore',
  'NoBarcode',
] satisfies AlignmentChannel[];

export const AlignmentChannelLabels = {
  Success: 'Successfully aligned',
  NoHits: 'No hits (not TCR/IG?)',
  FailedAfterAOverlap: 'Failed after alignment-overlap',
  NoCDR3Parts: 'No CDR3 parts',
  NoVHits: 'No V hits',
  NoJHits: 'No J hits',
  VAndJOnDifferentTargets: 'No target with both V and J',
  LowTotalScore: 'Low total score',
  NoBarcode: 'Absent barcode',
  SampleNotMatched: 'Sample not matched',
} satisfies Record<NotAlignedReason | AlignmentChannel, string>;

export const AlignmentChannelColors = {
  Success: '#6BD67D',
  NoHits: '#FEE27A',
  FailedAfterAOverlap: 'red', // @TODO (was missing)
  NoCDR3Parts: '#FEBF51',
  NoVHits: '#FB9361',
  NoJHits: '#E75B64',
  VAndJOnDifferentTargets: '#B8397A',
  LowTotalScore: '#7E2583',
  NoBarcode: '#4B1979',
  SampleNotMatched: '#2B125C',
} satisfies Record<NotAlignedReason | AlignmentChannel, string>;

export const AlignmentChainColors = {
  '': {
    total: '#A9A9A9',
    hasStops: '#A9A9A9',
    isOOF: '#A9A9A9',
  },
  'TRA': {
    total: '#105BCC',
    hasStops: '#2D93FA',
    isOOF: '#99CCFF',
  },
  'TRAD': {
    total: '#105BCC',
    hasStops: '#2D93FA',
    isOOF: '#99CCFF',
  },
  'TRB': {
    total: '#198020',
    hasStops: '#42B842',
    isOOF: '#99E099',
  },
  'TRD': {
    total: '#068A94',
    hasStops: '#27C2C2',
    isOOF: '#90E0E0',
  },
  'TRG': {
    total: '#5F31CC',
    hasStops: '#845CFF',
    isOOF: '#C1ADFF',
  },
  'IGH': {
    total: '#AD3757',
    hasStops: '#F05670',
    isOOF: '#FFADBA',
  },
  'IGL': {
    total: '#C26A27',
    hasStops: '#FF9429',
    isOOF: '#FFCB8F',
  },
  'IGK': {
    total: '#A324B2',
    hasStops: '#E553E5',
    isOOF: '#FAAAFA',
  },
} satisfies Record<ImmuneChain, Record<'total' | 'hasStops' | 'isOOF', string>>;

export const CoveregeGeneFeature = z.union([
  z.literal('CDR3'),
  z.literal('FR3_TO_FR4'),
  z.literal('CDR2_TO_FR4'),
  z.literal('FR2_TO_FR4'),
  z.literal('CDR1_TO_FR4'),
  z.literal('VDJRegion'),
]);
export type CoveregeGeneFeature = z.infer<typeof CoveregeGeneFeature>;

export const CoveregeGeneFeatureLabel = {
  CDR3: 'CDR3',
  CDR1_TO_FR4: 'CDR1 to FR4',
  FR2_TO_FR4: 'FR2 to FR4',
  CDR2_TO_FR4: 'CDR2 to FR4',
  FR3_TO_FR4: 'FR3 to FR4',
  VDJRegion: 'Full VDJRegion',
} satisfies Record<CoveregeGeneFeature, string>;

const ChainUsageEntry = z.object({
  total: z.number().int(),
  nonFunctional: z.number().int(),
  isOOF: z.number().int(),
  hasStops: z.number().int(),
});

const ChainUsage = z.object({
  chimeras: z.number().int(),
  total: z.number().int(),
  chains: z.record(ImmuneChain, ChainUsageEntry),
});

export const AlignReport = z.object({
  type: z.literal('alignerReport'),
  totalReadsProcessed: z.number().int(),
  aligned: z.number().int(),
  notAligned: z.number().int(),
  notAlignedReasons: z.record(NotAlignedReason, z.number().int()),
  overlapped: z.number().int(),
  overlappedAligned: z.number().int(),
  overlappedNotAligned: z.number().int(),
  alignmentAidedOverlaps: z.number().int(),
  noCDR3PartsAlignments: z.number().int(),
  partialAlignments: z.number().int(),
  chimeras: z.number().int(),
  vChimeras: z.number().int(),
  jChimeras: z.number().int(),
  pairedEndAlignmentConflicts: z.number().int(),
  realignedWithForcedNonFloatingBound: z.number().int(),
  realignedWithForcedNonFloatingRightBoundInLeftRead: z.number().int(),
  realignedWithForcedNonFloatingLeftBoundInRightRead: z.number().int(),
  chainUsage: ChainUsage,
  coverage: z.record(CoveregeGeneFeature, z.number().int()),
});
export type AlignReport = z.infer<typeof AlignReport>;

export function extractAlignmentChannels(report: AlignReport): [AlignmentChannel, number][] {
  return AlignmentChannels.map((cId) => [
    cId,
    cId === 'Success' ? report.aligned : report.notAlignedReasons[cId] ?? 0,
  ]);
}

const RoundedToInt = z.number().transform((n) => Math.round(n));

export const AssembleReport = z.object({
  type: z.literal('assemblerReport'),
  readsDroppedNoTargetSequence: z.number().int(),
  readsDroppedTooShortClonalSequence: z.number().int(),
  readsDroppedLowQuality: z.number().int(),
  coreReads: z.number().int(),
  readsDroppedFailedMapping: z.number().int(),
  lowQualityRescued: z.number().int(),
  clonesClustered: z.number().int(),

  clones: z.number().int(),
  clonesDroppedAsLowQuality: z.number().int(),
  clonesPreClustered: z.number().int(),
  readsPreClustered: z.number().int(),

  readsInClones: z.number().int(),
  readsInClonesBeforeClustering: z.number().int(),
  readsDroppedWithLowQualityClones: z.number().int(),

  clonalChainUsage: ChainUsage,

  clonesFilteredInFineFiltering: z.number().int(),
  readsFilteredInFineFiltering: RoundedToInt,

  clonesFilteredInPostFiltering: z.number().int(),
  readsFilteredInPostFiltering: RoundedToInt,
});
export type AssembleReport = z.infer<typeof AssembleReport>;

// @TODO (unused)
// const Reports = z.object({
//   align: AlignReport,
//   assemble: AssembleReport,
// });
